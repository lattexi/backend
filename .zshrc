export PATH=$PATH:/Users/laurikarhu/.npm-global/bin
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/laurikarhu/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/laurikarhu/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/laurikarhu/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/laurikarhu/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

